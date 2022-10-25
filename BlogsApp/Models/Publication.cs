using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BlogsApp.Models
{
    public class Publication
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }

        public Category? Category { get; set; }
        [Required] public string? Name { get; set; }
        public string? Text { get; set; }
    }
}
