package controllers

import javax.inject._
import models.UserRepository
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.ExecutionContext

/**
  */
@Singleton
class UsersController @Inject()(userRepository: UserRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def getAll = {
    Action.async { implicit request =>
      userRepository.list().map{
        user => Ok(Json.toJson(user))
      }
    }
  }

  def getById(id: Int) = Action.async { implicit request =>
    val options = for {
      maybeUser <- userRepository.findById(id)
    } yield (maybeUser)

    options.map { case (opt) =>
      opt match {
        case Some(user) => Ok(Json.toJson(user))
        case None => NotFound
      }
    }
  }

  def create = Action { Ok("") }

  def update(id: Int) = Action { Ok("") }

}
