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
        ).map { order =>
          Created(Json.toJson(order))
        }
      }
    )
  }

  def update(id: Int) = Action { Ok("") }

  def delete(id: Int) = Action.async(
    orderRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateOrderForm(userId: Int, createdAt: Timestamp)
