package models

import play.api.libs.json._

case class Category(id: Int, name: String, description: String, parentId: Int = -1)

object Category {
  implicit val categoryFormat = Json.format[Category]
}
