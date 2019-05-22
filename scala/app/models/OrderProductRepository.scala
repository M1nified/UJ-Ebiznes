package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderProductRepositoryRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, orderRepository: OrderRepository, productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class OrderProductTable(tag: Tag) extends Table[OrderProduct](tag, "order") {

    def id = column[Int]("order_id", O.PrimaryKey, O.AutoInc)

    def orderId = column[Int]("order_id")

    private def orderId_fk = foreignKey("order_id", orderId, order)(_.id)
    
    def productId = column[Int]("product_id")

    private def productId_fk = foreignKey("product_id", productId, product)(_.id)
    
    def amount = column[Int]("order_product_amount")

    def * = (id, orderId, productId, amount) <> ((OrderProduct.apply _).tupled, OrderProduct.unapply)
  }

  import orderRepository.OrderTable
  import productRepository.ProductTable

  private val orderProduct = TableQuery[OrderProductTable]

  private val order = TableQuery[OrderTable]

  private val product = TableQuery[ProductTable]

  def create(orderId: Int, productId: Int, amount: Int): Future[OrderProduct] = db.run {

    (orderProduct.map(c => (c.orderId, c.productId, c.amount))

      returning order.map(_.id)

      into { case ((orderId, productId, amount), id) => OrderProduct(id, orderId, productId, amount) }

      ) += (orderId, productId, amount)
  }

  def list(): Future[Seq[OrderProduct]] = db.run {
    orderProduct.result
  }
}
