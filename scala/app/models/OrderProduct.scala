package models

import java.sql.Timestamp

import play.api.libs.json._

case class OrderProduct(id: Int, orderId: Int, productId: Int, amount: Int)

object OrderProduct {
  implicit val orderProductFormat = Json.format[OrderProduct]
}
