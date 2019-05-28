package controllers

import javax.inject._
import models.AdminRepository
import play.api.data.Form
import play.api.data.Forms.{mapping, _}
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

/**
  */
@Singleton
class AdminController @Inject()(adminRepository: AdminRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  val adminForm: Form[CreateAdminForm] = Form {
    mapping(
      "email" -> nonEmptyText,
      "password"-> nonEmptyText,
    )(CreateAdminForm.apply)(CreateAdminForm.unapply)
  }

  def getAll = Action.async {
    implicit request =>
      adminRepository.list().map {
        admin => Ok(Json.toJson(admin))
      }
  }

  def getById(id: Int) = Action.async { implicit request =>
    val options = for {
      maybeCategory <- adminRepository.findById(id)
    } yield (maybeCategory)

    options.map { case (opt) =>
      opt match {
        case Some(admin) => Ok(Json.toJson(admin))
        case None => NotFound
      }
    }
  }

  def create =
    Action.async(parse.json) {
      implicit request =>
        adminForm.bindFromRequest.fold(
          errorForm => {
            Future.successful(BadRequest("Failed to create admin."))
          },
          admin => {
            adminRepository.create(
              admin.email: String,
              admin.password: String,
            ).map { category =>
              Created(Json.toJson(category))
            }
          }
        )
    }

  def delete(id: Int) = Action.async(
    adminRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateAdminForm(email: String, password: String)

