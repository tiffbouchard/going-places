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
        <Menu.Items className="dark:bg-black-70 backdrop-blur-lg absolute left-0 z-30 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md border border-grayborder bg-white shadow-md focus:outline-none">

          <div className="p-1">
            { links?.map((link, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'text-sm bg-gray-100 rounded-lg text-gray-900 dark:text-white dark:bg-blue-100 py-1 px-3' : 'py-1 px-3 text-gray-700 dark:text-white',
                      'block text-sm'
                    )}
                  >
                    {link}
                  </a>
                )}
              </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}