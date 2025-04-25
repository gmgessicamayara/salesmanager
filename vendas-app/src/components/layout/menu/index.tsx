import Link from "next/link";

export const Menu: React.FC = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Sales Manager</p>
      <ul className="menu-list">
        <MenuItem href="/" label="Home" />
        <MenuItem href="/searches/products" label="Products" />
        <MenuItem href="/searches/customers" label="Customers" />
        <MenuItem href="/" label="Config" />
        <MenuItem href="/" label="Sair" />
      </ul>
    </aside>
  );
};

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <li>
      <Link href={props.href}>
        <span className="icon"></span> {props.label}
      </Link>
    </li>
  );
};
