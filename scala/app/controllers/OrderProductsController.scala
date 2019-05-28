package controllers

import javax.inject._
import models.OrderProductRepository
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

/**
  */
@Singleton
class OrderProductsController @Inject()(orderProductRepository: OrderProductRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  val orderProductForm: Form[CreateOrderProductForm] = Form {
    mapping(
      "orderId" -> number,
      "productId"-> number,
      "amount"-> number,
    )(CreateOrderProductForm.apply)(CreateOrderProductForm.unapply)
  }

  def getAll = Action.async(
    implicit request => (
      orderProductRepository.list().map(
        orderProduct => Ok(Json.toJson(orderProduct))
      )
      )
  )

  def getById(id: Int) = Action.async { implicit request =>
    val options = for {
      maybeInventory <- orderProductRepository.findById(id)
    } yield (maybeInventory)

    options.map { case (opt) =>
      opt match {
        case Some(orderProduct) => Ok(Json.toJson(orderProduct))
        case None => NotFound
      }
    }
  }

  def getByOrderId(orderId: Int) = Action.async(
    implicit request => (
      orderProductRepository.findByOrderId(orderId).map(
        orderProduct => Ok(Json.toJson(orderProduct))
      )
      )
  )

  def create = Action.async { implicit request =>
    orderProductForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(BadRequest("Failed to create orderProduct."))
      },
      orderProduct => {
        orderProductRepository.create(
          orderProduct.orderId,
          orderProduct.productId,
          orderProduct.amount,
        ).map { inventory =>
          Created(Json.toJson(inventory))
        }
      }
    )
  }

  def update(id: Int) =
    Action.async(parse.json){
      implicit request =>
        orderProductForm.bindFromRequest.fold(
          _ => {
            Future.successful(BadRequest("Failed to update orderProduct."))
          },
          orderProduct => {
            orderProductRepository.update(models.OrderProduct(
              id,
              orderProduct.orderId,
              orderProduct.productId,
              orderProduct.amount,
            )).map({ _ =>
              Ok
            })
          }
        )
    }

  def delete(id: Int) = Action.async(
    orderProductRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateOrderProductForm(orderId: Int, productId: Int, amount: Int)
