package models

import play.api.libs.json._

case class Product(id: Int, name: String, description: String, price: Int, image: String, unavailable: Boolean, categoryId: Int)

object Product {
  implicit val productFormat = Json.format[Product]
}
