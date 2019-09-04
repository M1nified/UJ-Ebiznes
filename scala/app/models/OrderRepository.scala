package models

import java.sql.Timestamp

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.sql.SqlProfile.ColumnOption.SqlType

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class OrderRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, userRepository: UserRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class OrderTable(tag: Tag) extends Table[Order](tag, "order") {

    def id = column[Int]("order_id", O.PrimaryKey, O.AutoInc)

    def userId = column[Int]("user_id")

    private def userId_fk = foreignKey("user_id", userId, user)(_.id)

    def createdAt = column[Timestamp]("order_created_at", SqlType("timestamp not null default CURRENT_TIMESTAMP"))

    def country = column[String]("order_country")

    def city = column[String]("order_city")

    def address = column[String]("order_address")

    def postal = column[String]("order_postal")

    def name1 = column[String]("order_name1")

    def name2 = column[String]("order_name2")

    def * = (id, userId, createdAt, country, city, address, postal, name1, name2) <> ((Order.apply _).tupled, Order.unapply)
  }

  import userRepository.UserTable

  private val order = TableQuery[OrderTable]

  private val user = TableQuery[UserTable]

  def create(userId: Int, createdAt: Timestamp, country: String, city: String, address: String, postal: String, name1: String, name2: String): Future[Order] = db.run {

    (order.map(c => (c.userId, c.createdAt, c.country, c.city, c.address, c.postal, c.name1, c.name2))

      returning order.map(_.id)

      into { case ((userId, createdAt, country, city, address, postal, name1, name2), id) => Order(id, userId, createdAt, country, city, address, postal, name1, name2) }

    ) += ((userId, createdAt, country, city, address, postal, name1, name2): (Int, java.sql.Timestamp, String, String, String, String, String, String))
  }

  def update(newValue: Order) = db.run {
    order.insertOrUpdate(newValue)
  }

  def list(): Future[Seq[Order]] = db.run {
    order.result
  }

  def findById(id: Int): Future[Option[Order]] = db.run {
    order.filter(_.id === id).result.headOption
  }

  def delete(id: Int): Future[Unit] = db.run {
    (order.filter(_.id === id).delete).map(_ => ())
  }
}
