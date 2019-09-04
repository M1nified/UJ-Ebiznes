package models

import java.sql.Timestamp
import java.text.SimpleDateFormat

import play.api.libs.json._

case class Order(id: Int, userId: Int, createdAt: Timestamp, country: String, city: String, address: String, postal: String, name1: String, name2: String)

object Order extends ((Int, Int, Timestamp, String, String, String, String, String, String) => Order) {

  implicit object timestampFormat extends Format[Timestamp] {
    val format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
    val printFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
    def reads(json: JsValue) = {
      val str = json.as[String]
      JsSuccess(new Timestamp(format.parse(str).getTime))
    }
    def writes(ts: Timestamp) = JsString(printFormat.format(ts))
  }

  implicit val orderFormat = Json.format[Order]
}
