package controllers

import javax.inject._
import play.api.mvc._
import models.{Category, CategoryRepository}
import play.api.data.Form
import play.api.data.Forms.mapping
import play.api.libs.json.Json
import play.api.data.Forms._
//import play.filters.csrf.CSRFCheck

import scala.concurrent.{ExecutionContext, Future}

/**
  */
@Singleton
class CategoriesController @Inject()(categoryRepository: CategoryRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  val categoryForm: Form[CreateCategoryForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "description"-> nonEmptyText,
      "parentId" -> optional(number)
    )(CreateCategoryForm.apply)(CreateCategoryForm.unapply)
  }

  def getAll = Action.async {
    implicit request =>
      categoryRepository.list().map {
        category => Ok(Json.toJson(category))
      }
  }

  def getById(id: Int) = Action.async { implicit request =>
    val options = for {
      maybeCategory <- categoryRepository.findById(id)
    } yield (maybeCategory)

    options.map { case (opt) =>
      opt match {
        case Some(category) => Ok(Json.toJson(category))
        case None => NotFound
      }
    }
  }

  def create =
    Action.async(parse.json) {
      implicit request =>
        categoryForm.bindFromRequest.fold(
          errorForm => {
            Future.successful(BadRequest("Failed to create category."))
          },
          category => {
            categoryRepository.create(
              category.name: String,
              category.description: String,
              category.parentId: Option[Int],
            ).map { category =>
              Created(Json.toJson(category))
            }
          }
        )
    }

  def update(id: Int) =
    Action.async(parse.json){
      implicit request =>
        categoryForm.bindFromRequest.fold(
          _ => {
            Future.successful(BadRequest("Failed to update category."))
          },
          category => {
            categoryRepository.update(models.Category(
              id,
              category.name,
              category.description,
              category.parentId
            )).map({ _ =>
              Ok
            })
          }
        )
    }

  def delete(id: Int) = Action.async(
    categoryRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateCategoryForm(name: String, description: String, parentId: Option[Int])
