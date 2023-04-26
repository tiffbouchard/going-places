import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface DropdownProps {
  name: string;
  style?: string;
  links?: string[];
}

export default function Dropdown({name, style, links}: DropdownProps) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={style}>
          {name}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="relative">
          <Menu.Items className="text-black dark:bg-black-60 bg-[#e5e7ebe6] absolute left-0 z-30 mt-2 w-56 origin-top-left rounded-md shadow-md focus:outline-none">
            {/* <div className="backdrop-blur-[30px] absolute inset-0 rounded-md"></div> */}
            <div className="p-1 relative z-10">
              { links?.map((link, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href="#"
                      className="text-sm text-black-100 w-full block rounded-lg hover:bg-blue-100 hover:text-white py-1 px-3"
                    >
                      {link}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  )
}
