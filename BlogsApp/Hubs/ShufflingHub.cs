using Microsoft.AspNetCore.SignalR;

namespace BlogsApp.Hubs
{

    public class ShufflingHub : Hub
    {
        
        public static int count  = 0;
        public async override Task OnConnectedAsync()
        {
            count++; 
            await Clients.All.SendAsync("Count", count);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            count--;
            await Clients.All.SendAsync("Count", count);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task Drag(int pub)
        {
            await Clients.All.SendAsync("ReceiveDrag", pub);
        }
        public async Task Drop(int pub, int cat)
        {
            await Clients.All.SendAsync("ReceiveDrop", pub, cat);
        }
    }
}
