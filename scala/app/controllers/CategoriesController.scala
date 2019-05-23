package controllers

import javax.inject._
import play.api.mvc._
import models.CategoryRepository
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext

/**
  */
@Singleton
class CategoriesController @Inject()(categoryRepository: CategoryRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def getAll = Action.async {
    implicit request =>
      categoryRepository.list().map {
        category => Ok(Json.toJson(category))
      }
  }

  def getById(id: String) = Action { Ok("") }

  def create = Action { Ok("") }

  def update(id: String) = Action { Ok("") }

}
