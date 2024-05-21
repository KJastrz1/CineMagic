namespace CineMagic.Shared;
public class PaginatedResult<T>
{
    public List<T> PageContent { get; set; }
    public int TotalRecords { get; set; }
    public int PageSize { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalRecords / PageSize);
}
