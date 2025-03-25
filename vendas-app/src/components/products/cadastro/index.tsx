import { useState } from 'react';
import { Layout, Input } from 'components';
import { useProductService } from 'app/services';
import { Product } from 'app/models/products';

export const CadastroProdutos: React.FC = () => {
  const service = useProductService();
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [registrationDate, setRegistrationDate] = useState<string>('');

  const submit = () => {
    const product: Product = {
      sku,
      price: parseFloat(price),
      name,
      description,
    };

    service.save(product).then((productResponse: Product) => {
      setId(productResponse.id ?? '');
      setRegistrationDate(productResponse.registrationDate ?? '');
    });
  };

  return (
    <Layout titulo='Products'>
      {id && (
        <div className='columns'>
          <Input
            label='ID:'
            columnClasses='is-half'
            id='inputId'
            value={id}
            disabled
          />

          <Input
            label='Registration date:'
            columnClasses='is-half'
            id='inputRegistrationDate'
            value={registrationDate}
            disabled
          />
        </div>
      )}

      <div className='columns'>
        <Input
          label='SKU: *'
          columnClasses='is-half'
          onChange={setSku}
          id='inputSku'
          value={sku}
          placeholder='Enter the product SKU'
        />

        <Input
          label='Price: *'
          columnClasses='is-half'
          onChange={setPrice}
          id='inputPreco'
          value={price}
        />
      </div>

      <div className='columns'>
        <Input
          label='Name: *'
          columnClasses='is-full'
          onChange={setName}
          id='inputNome'
          value={name}
          placeholder='Enter the product name'
        />
      </div>

      <div className='columns'>
        <div className='field column is-full'>
          <label className='label' htmlFor='inputDescricao'>
            Description
          </label>
          <div className='control'>
            <textarea
              className='textarea'
              id='inputDescription'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder='Enter the detailed product description'
            />
          </div>
        </div>
      </div>
      <div className='field is-grouped'>
        <div className='control'>
          <button onClick={submit} className='button is-link'>
            Save
          </button>
        </div>
        <div className='control'>
          <button className='button'>Back</button>
        </div>
      </div>
    </Layout>
  );
};
