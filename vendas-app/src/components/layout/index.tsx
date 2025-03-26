import { ReactNode } from 'react';
import { Menu } from './menu';
import { Alert, Message } from 'components/common/message';

interface LayoutProps {
  titulo?: string;
  children?: ReactNode;
  messages?: Array<Alert>;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className='app'>
      <section className='main-content columns is-fullheight'>
        <Menu />

        <div className='container column is-10'>
          <div className='section'>
            <div className='card'>
              <div className='card-header'>
                <p className='card-header-title'>{props.titulo}</p>
              </div>
              <div className='card-content'>
                {props.messages &&
                  props.messages.map((msg) => (
                    <Message key={msg.text} {...msg} />
                  ))}
                <div className='content'>{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
