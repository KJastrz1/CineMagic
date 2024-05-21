using Microsoft.Extensions.Logging;
using CineMagic.Shared;
using CineMagic.Shared.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace CineMagic.API.Services
{
    public class FileService
    {
        private readonly Cloudinary _cloudinary;
        private readonly ILogger<FileService> _logger;

        public FileService(IConfiguration config, ILogger<FileService> logger)
        {
            _logger = logger;
   
            var account = new Account(
                config["Cloudinary:CloudName"],
                config["Cloudinary:ApiKey"],
                config["Cloudinary:ApiSecret"]
            );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<ServiceResponse<string>> UploadFileAsync(IFormFile file, string folder = null)
        {
            var response = new ServiceResponse<string>();

            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Folder = folder
                };

                var uploadResult = _cloudinary.Upload(uploadParams);
                if (uploadResult.Error != null)
                {
                    response.Success = false;
                    response.Message = uploadResult.Error.Message;              
                    return response;
                }
                response.Data = uploadResult.SecureUrl.ToString();
                response.Success = true;
            }
            else
            {
                response.Success = false;
                response.Message = "File is empty.";
             
            }

            return response;
        }
    }
}
