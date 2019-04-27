package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import models.ProductRepository

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class InventoryRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class InventoryTable(tag: Tag) extends Table[Inventory](tag, "inventory") {

    def id = column[Int]("inventory_id", O.PrimaryKey, O.AutoInc)

    def productId = column[Int]("product_id")

    def productId_fk = foreignKey("inventory_product_id", productId, product)(_.id)

    def inventoryCount = column[Int]("inventory_count")

    def * = (id, productId, inventoryCount) <> ((Inventory.apply _).tupled, Inventory.unapply)
  }

  import productRepository.ProductTable

  val inventory = TableQuery[InventoryTable]

  private val product = TableQuery[ProductTable]

  def create(productId: Int, inventoryCount: Int): Future[Inventory] = db.run {

    (inventory.map(c => (c.productId, c.inventoryCount))

      returning inventory.map(_.id)

      into { case ((productId, inventoryCount), id) => Inventory(id, productId, inventoryCount) }

      ) += (productId, inventoryCount)
  }

  def list(): Future[Seq[Inventory]] = db.run {
    inventory.result
  }
}
