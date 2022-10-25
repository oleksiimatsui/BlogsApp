using System.ComponentModel.DataAnnotations;

namespace BlogsApp.Models
{
    public class Category
    {
        public Category()
        {
            Publications = new List<Publication>();
        }

        public int Id { get; set; }
        [Required] public string? Name { get; set; }
        public virtual ICollection<Publication> Publications { get; set; }
    }
}
