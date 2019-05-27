package controllers

import javax.inject._
import models.AdminRepository
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.ExecutionContext

/**
  */
@Singleton
class AdminController @Inject()(adminRepository: AdminRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

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

}
