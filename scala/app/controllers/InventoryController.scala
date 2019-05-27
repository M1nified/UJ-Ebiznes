package controllers

import javax.inject._
import play.api.mvc._
import models.InventoryRepository
import play.api.data.Form
import play.api.libs.json.Json
import play.api.data.Forms._

import scala.concurrent.{ExecutionContext, Future}

/**
  */
@Singleton
class InventoryController @Inject()(inventoryRepository: InventoryRepository,cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  val inventoryForm: Form[CreateInventoryForm] = Form {
    mapping(
      "productId" -> number,
      "inventoryCount"-> number,
    )(CreateInventoryForm.apply)(CreateInventoryForm.unapply)
  }

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

  def create = Action.async { implicit request =>
    inventoryForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(BadRequest("Failed to create inventory."))
      },
      inventory => {
        inventoryRepository.create(
          inventory.productId,
          inventory.inventoryCount,
        ).map { inventory =>
          Created(Json.toJson(inventory))
        }
      }
    )
  }

  def update(id: Int) =
    Action.async(parse.json){
      implicit request =>
        inventoryForm.bindFromRequest.fold(
          _ => {
            Future.successful(BadRequest("Failed to update inventory."))
          },
          inventory => {
            inventoryRepository.update(models.Inventory(
              id,
              inventory.productId,
              inventory.inventoryCount
            )).map({ _ =>
              Ok
            })
          }
        )
    }

  def delete(id: Int) = Action.async(
    inventoryRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateInventoryForm(productId: Int, inventoryCount: Int)
