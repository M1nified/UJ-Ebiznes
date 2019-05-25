package controllers

import javax.inject._
import models.{User, UserRepository}
import play.api.data.Form
import play.api.data.Forms.{mapping, of}
import play.api.libs.json.Json
import play.api.mvc._
import play.api.data.Forms._
import scala.concurrent.{Future, ExecutionContext}

/**
  */
@Singleton
class UsersController @Inject()(userRepository: UserRepository, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  val userForm: Form[CreateUserForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "name2"-> nonEmptyText,
      "password" -> nonEmptyText,
      "email" -> nonEmptyText,
      "country"-> nonEmptyText,
      "street" -> nonEmptyText,
      "city" -> nonEmptyText,
      "address"-> nonEmptyText,
      "postal" -> nonEmptyText
    )(CreateUserForm.apply)(CreateUserForm.unapply)
  }

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

  def create = Action.async { implicit request =>
    userForm.bindFromRequest.fold(
      errorForm => {
        Future.successful(BadRequest("Failed to create user."))
      },
      user => {
        userRepository.create(
          user.name,
          user.name2,
          user.password,
          user.email,
          user.country,
          user.street,
          user.city,
          user.address,
          user.postal
        ).map { user =>
          Created(Json.toJson(user))
        }
      }
    )
  }

  def update(id: Int) = Action { Ok("") }

  def delete(id: Int) = Action.async(
    userRepository.delete(id).map(_ => Ok(""))
  )

}

case class CreateUserForm(name: String, name2: String, password: String, email: String, country: String, street: String, city: String, address: String, postal: String)
