using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CineMagic.Shared.MessageBox
{
    public interface IMessageDialogService
    {
        void ShowMessage(string message);
    }
}
