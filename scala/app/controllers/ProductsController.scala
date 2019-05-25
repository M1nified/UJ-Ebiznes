package controllers

import javax.inject._
import play.api.mvc._
import models.ProductRepository
import play.api.data.Form
import play.api.data.Forms.mapping
import play.api.libs.json.Json
import play.api.data.Forms._

import scala.concurrent.{ExecutionContext, Future}

/**
  */
@Singleton
class ProductsController @Inject()(productRepository: ProductRepository,cc: ControllerComponents) (implicit ec: ExecutionContext )extends AbstractController(cc) {

  val productForm: Form[CreateProductForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "description"-> nonEmptyText,
      "price" -> number,
      "image" -> nonEmptyText,
      "unavailable"-> boolean,
      "categoryId" -> number
    )(CreateProductForm.apply)(CreateProductForm.unapply)
  }

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

  def create = Action.async { implicit request =>
    productForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(BadRequest("Failed to create product."))
      },
      product => {
        productRepository.create(
          product.name,
          product.description,
          product.price,
          product.image,
          product.unavailable,
          product.categoryId
        ).map { user =>
          Created(Json.toJson((user)))
        }
      }
    )
  }

  def update(id: Int) = Action { Ok("") }

  def delete(id: Int) = Action.async(
    productRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateProductForm(name: String, description: String, price: Int, image: String, unavailable: Boolean, categoryId: Int)
