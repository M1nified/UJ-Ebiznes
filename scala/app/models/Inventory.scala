package models

import play.api.libs.json._

case class Inventory(id: Int, productId: Int, inventoryCount: Int)

object Inventory {
  implicit val inventoryFormat = Json.format[Inventory]
}
