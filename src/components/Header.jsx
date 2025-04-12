import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LinkIcon, LogOut } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const user = false;

  return (
    <nav className='py-4 flex justify-between items-center'>
      <Link to="/">
        <img src="/Logo.jpeg" className='h-16' alt="Logo" />
      </Link>

      <div className='flex gap-4'>
        {!user ?
          <Button onClick={() => navigate("/auth")}>Login</Button> :
          (
            <DropdownMenu>
              <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>GS</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className='py-2'>Gurusharan Sahu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex pb-1">
                    <LinkIcon  className="mr-2 h-5 w-4" />
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='text-red-400 flex py-1'>
                  <LogOut className='mr-2 h-5 w-4' />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          )
        }
      </div>
    </nav>
  )
}

export default Header