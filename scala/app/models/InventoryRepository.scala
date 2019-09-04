package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class InventoryRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  protected val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  import productRepository.ProductTable

  class InventoryTable(tag: Tag) extends Table[Inventory](tag, "inventory") {

    def id = column[Int]("inventory_id", O.PrimaryKey, O.AutoInc)

    def productId = column[Int]("product_id")

    private def productId_fk = foreignKey("inventory_product_id", productId, product)(_.id)

    def inventoryCount = column[Int]("inventory_count")

    def * = (id, productId, inventoryCount) <> ((Inventory.apply _).tupled, Inventory.unapply)
  }

  private val inventory = TableQuery[InventoryTable]

  private val product = TableQuery[ProductTable]

  def create(productId: Int, inventoryCount: Int): Future[Inventory] = db.run {

    (inventory.map(c => (c.productId, c.inventoryCount))

      returning inventory.map(_.id)

      into { case ((productId, inventoryCount), id) => Inventory(id, productId, inventoryCount) }

    ) += ((productId, inventoryCount): (Int, Int))
  }

  def update(newValue: Inventory) = db.run {
    inventory.insertOrUpdate(newValue)
  }

  def list(): Future[Seq[Inventory]] = db.run {
    inventory.result
  }

  def findById(id: Int): Future[Option[Inventory]] = db.run {
    inventory.filter(_.id === id).result.headOption
  }

  def delete(id: Int): Future[Unit] = db.run {
    (inventory.filter(_.id === id).delete).map(_ => ())
  }
}
