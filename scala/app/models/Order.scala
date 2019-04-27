package models

import java.sql.Timestamp

import play.api.libs.json._

case class Order(id: Int, userId: Int, createdAt: Timestamp)

object Order {
  implicit val orderFormat = Json.format[Order]
}
