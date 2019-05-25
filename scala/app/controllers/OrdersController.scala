package controllers

import javax.inject._
import play.api.mvc._
import models.OrderRepository
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext
/**
  */
@Singleton
class OrdersController @Inject()(orderRepository: OrderRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def getAll = Action.async(
    implicit request => (
      orderRepository.list().map(
        order => Ok(Json.toJson(order))
      )
    )
  )

  def getById(id: Int) = Action { Ok("") }

  def create = Action { Ok("") }

  def update(id: Int) = Action { Ok("") }

}
