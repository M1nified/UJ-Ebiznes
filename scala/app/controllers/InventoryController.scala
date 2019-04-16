package controllers

import javax.inject._
import play.api.mvc._

/**
  */
@Singleton
class InventoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def getAll = Action { Ok("") }

  def getById(id: String) = Action { Ok("") }

  def create = Action { Ok("") }

  def update(id: String) = Action { Ok("") }

}
