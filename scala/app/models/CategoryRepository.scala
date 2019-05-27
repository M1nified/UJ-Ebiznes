package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{Future, ExecutionContext}

@Singleton
class CategoryRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  protected val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class CategoryTable(tag: Tag) extends Table[Category](tag, "category") {

    def id = column[Int]("category_id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("category_name")

    def description = column[String]("category_description")

    def parentId = column[Option[Int]]("category_parent_id")

    def parentId_fk = foreignKey("category_category_parent_id", parentId, category)(_.id)

    def * = (id, name, description, parentId) <> ((Category.apply _).tupled, Category.unapply)
  }

  private val category = TableQuery[CategoryTable]

  def create(name: String, description: String = "", parentId: Option[Int]): Future[Category] = db.run {

    (category.map(c => (c.name, c.description, c.parentId))

      returning category.map(_.id)

      into { case ((name, description, parentId), id) => Category(id, name, description, parentId) }

      ) += (name, description, parentId)
  }

  def update(newValue: Category) = db.run{
    category.insertOrUpdate(newValue)
  }

  def list(): Future[Seq[Category]] = db.run {
    category.result
  }

  def findById(id: Int): Future[Option[Category]] = db.run{
    category.filter(_.id === id).result.headOption
  }

  def delete(id: Int): Future[Unit] = db.run{
    (category.filter(_.id === id).delete).map(_ => ())
  }

}
