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

  def getById(id: Int) = Action.async { implicit request =>
    val options = for {
      maybeInventory <- inventoryRepository.findById(id)
    } yield (maybeInventory)

    options.map { case (opt) =>
      opt match {
        case Some(inventory) => Ok(Json.toJson(inventory))
        case None => NotFound
      }
    }
  }

  def create = Action { Ok("") }

  def update(id: Int) = Action { Ok("") }

}
