package controllers

import javax.inject._
import play.api.mvc._
import models.InventoryRepository
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext

/**
  */
@Singleton
class InventoryController @Inject()(inventoryRepository: InventoryRepository,cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def getAll = Action.async(
    implicit request => (
      inventoryRepository.list().map(
        inventory => Ok(Json.toJson(inventory))
      )
    )
  )

  def getById(id: String) = Action { Ok("") }

  def create = Action { Ok("") }

  def update(id: String) = Action { Ok("") }

}
