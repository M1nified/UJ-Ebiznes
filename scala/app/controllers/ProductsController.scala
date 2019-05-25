package controllers

import javax.inject._
import play.api.mvc._
import models.ProductRepository
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext

/**
  */
@Singleton
class ProductsController @Inject()(productRepository: ProductRepository,cc: ControllerComponents) (implicit ec: ExecutionContext )extends AbstractController(cc) {

  def getAll = Action.async(
    implicit request => (
      productRepository.list().map(
        product => Ok(Json.toJson(product))
      )
    )
  )

  def getById(id: Int) = Action.async { implicit request =>
    val options = for {
      maybeProduct <- productRepository.findById(id)
    } yield (maybeProduct)

    options.map { case (opt) =>
      opt match {
        case Some(product) => Ok(Json.toJson(product))
        case None => NotFound
      }
    }
  }

  def create = Action { Ok("") }

  def update(id: Int) = Action { Ok("") }

}
