package models

import java.sql.Timestamp

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.sql.SqlProfile.ColumnOption.SqlType

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderRepository @Inject()(dbConfigProvider: DatabaseConfigProvider, userRepository: UserRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class OrderTable(tag: Tag) extends Table[Order](tag, "order") {

    def id = column[Int]("order_id", O.PrimaryKey, O.AutoInc)

    def userId = column[Int]("user_id")

    private def userId_fk = foreignKey("user_id", userId, user)(_.id)

    def createdAt = column[Timestamp]("order_created_at", SqlType("timestamp not null default CURRENT_TIMESTAMP"))

    def * = (id, userId, createdAt) <> ((Order.apply _).tupled, Order.unapply)
  }

  import userRepository.UserTable

  private val order = TableQuery[OrderTable]

  private val user = TableQuery[UserTable]

  def create(userId: Int, createdAt: Timestamp): Future[Order] = db.run {

    (order.map(c => (c.userId, c.createdAt))

      returning order.map(_.id)

      into { case ((userId, createdAt), id) => Order(id, userId, createdAt) }

      ) += (userId, createdAt)
  }

  def list(): Future[Seq[Order]] = db.run {
    order.result
  }
}
