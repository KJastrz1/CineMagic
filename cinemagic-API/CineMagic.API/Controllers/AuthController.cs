using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CineMagic.API.Services.AuthService;
using CineMagic.Shared;
using CineMagic.Shared.Auth;
using System.Security.Claims;
using Google.Apis.Auth;

namespace CineMagic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;


        public AuthController(IAuthService authService )
        {
            _authService = authService;
          
        }    

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<AuthTokenResponse>>> Login(UserLoginDTO userLoginDTO)
        {
            var response = await _authService.Login(userLoginDTO.Email, userLoginDTO.Password);
            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDTO userRegisterDTO)
        {
            var user = new User()
            {
                Email = userRegisterDTO.Email,
                Username = userRegisterDTO.Username
            };

            var response = await _authService.Register(user, userRegisterDTO.Password);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);

        }
        [HttpPost("change-password"), Authorize]
        public async Task<ActionResult<ServiceResponse<bool>>> ChangePassword([FromBody] ChangePasswordDTO changePasswordDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);


            var response = await _authService.ChangePassword(int.Parse(userId), changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("google")]
        public async Task<ActionResult<ServiceResponse<AuthTokenResponse>>> GoogleSignIn([FromBody] TokenModel tokenModel)
        {
            try
            {

                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenModel.tokenId);

                var user = new User()
                {
                    Email = payload.Email,
                    Username = payload.Name,
                    GoogleId = payload.Subject
                };

                var result = await _authService.GoogleLogin(user);
                return Ok(result);

            }
            catch (InvalidJwtException)
            {
                return Unauthorized();
            }
        }
    }
}
