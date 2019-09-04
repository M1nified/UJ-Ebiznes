package controllers

import java.sql.Timestamp

import javax.inject._
import play.api.mvc._
import models.OrderRepository
import play.api.data.Form
import play.api.data.Forms.mapping
import play.api.libs.json.Json

import play.api.data.Forms._

import scala.concurrent.{ExecutionContext, Future}
/**
  */
@Singleton
class OrdersController @Inject()(orderRepository: OrderRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  val orderForm: Form[CreateOrderForm] = Form {
    mapping(
      "userId" -> number,
      "createdAt"-> sqlTimestamp,
      "country" -> nonEmptyText,
      "city" -> nonEmptyText,
      "address" -> nonEmptyText,
      "postal" -> nonEmptyText,
      "name1" -> nonEmptyText,
      "name2" -> nonEmptyText,
    )(CreateOrderForm.apply)(CreateOrderForm.unapply)
  }


  def getAll = Action.async(
    implicit request => (
      orderRepository.list().map(
        order => Ok(Json.toJson(order))
      )
    )
  )

  def getById(id: Int) = Action.async { implicit request =>
    val options = for {
      maybeOrder <- orderRepository.findById(id)
    } yield (maybeOrder)

    options.map { case (opt) =>
      opt match {
        case Some(order) => Ok(Json.toJson(order))
        case None => NotFound
      }
    }
  }

  def create = Action.async { implicit request =>
    orderForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(BadRequest("Failed to create order."))
      },
      order => {
        orderRepository.create(
          order.userId,
          order.createdAt,
          order.country,
          order.city,
          order.address,
          order.postal,
          order.name1,
          order.name2,
        ).map { order =>
          Created(Json.toJson(order))
        }
      }
    )
  }

  def update(id: Int) =
    Action.async(parse.json){
      implicit request =>
        orderForm.bindFromRequest.fold(
          _ => {
            Future.successful(BadRequest("Failed to update order."))
          },
          order => {
            orderRepository.update(models.Order(
              id,
              order.userId,
              order.createdAt,
              order.country,
              order.city,
              order.address,
              order.postal,
              order.name1,
              order.name2,
            )).map({ _ =>
              Ok
            })
          }
        )
    }

  def delete(id: Int) = Action.async(
    orderRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateOrderForm(userId: Int, createdAt: Timestamp, country: String, city: String, address: String, postal: String, name1: String, name2: String)
