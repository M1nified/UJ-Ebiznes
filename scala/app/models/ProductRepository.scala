package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
//import models.CategoryRepository
import scala.concurrent.{Future, ExecutionContext}

@Singleton
class ProductRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, categoryRepository: CategoryRepository)(implicit ec: ExecutionContext) {
  protected val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  import categoryRepository.CategoryTable

  class ProductTable(tag: Tag) extends Table[Product](tag, "product") {

    def id = column[Int]("product_id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("product_name")

    def description = column[String]("product_description")

//    def parentId = column[Int]("product_parent_id")

    def price = column[Int]("product_price")

    def image = column[String]("product_image")

    def unavailable = column[Boolean]("product_unavailable")

    def categoryId = column[Int]("category_id")

    private def categoryId_fk = foreignKey("category_id", categoryId, cat)(_.id)

    def * = (id, name, description, price, image, unavailable, categoryId) <> ((Product.apply _).tupled, Product.unapply)
  }

  private val product = TableQuery[ProductTable]

  private val cat = TableQuery[CategoryTable]


  def create(name: String, description: String, price: Int, image: String, unavailable: Boolean, categoryId: Int): Future[Product] = db.run {

    (product.map(c => (c.name, c.description, c.price, c.image, c.unavailable, c.categoryId))

      returning product.map(_.id)

      into { case ((name, description, price, image, unavailable, categoryId), id) => Product(id, name, description, price, image, unavailable, categoryId) }

      ) += (name, description, price, image, unavailable, categoryId)
  }

  def list(): Future[Seq[Product]] = db.run {
    product.result
  }

  def findById(id: Int): Future[Option[Product]] = db.run{
    product.filter(_.id === id).result.headOption
  }

  def delete(id: Int): Future[Unit] = db.run{
    (product.filter(_.id === id).delete).map(_ => ())
  }
}
