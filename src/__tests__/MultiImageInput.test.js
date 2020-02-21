import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import MultiImageInput from '../lib';

const crop = {
  unit: '%',
  aspect: 4 / 3,
  width: '100'
};
let images = {};
const setImages = imageUpdate => (image = imageUpdate);

test('renders correctly', () => {
  let images = {};
  const setImages = imageUpdate => (image = imageUpdate);

  const { baseElement } = render(
    <MultiImageInput
      images={images}
      setImages={setImages}
      cropConfig={{ crop, ruleOfThirds: true }}
    />
  );
  expect(baseElement).toMatchSnapshot();
});

test('renders the right number of images', () => {
  let images = {
    0: 'https://dababy.com/image.png',
    1: 'https://larajean.com/image.png'
  };
  const setImages = imageUpdate => (image = imageUpdate);
  const { getAllByAltText } = render(
    <MultiImageInput
      images={images}
      setImages={setImages}
      cropConfig={{ crop, ruleOfThirds: true }}
    />
  );
  const selectedImages = getAllByAltText(/^uploaded image\d/);
  expect(selectedImages.length).toBe(2);
});

test('renders the uploadImage element', () => {
  let images = {
    0: 'https://dababy.com/image.png',
    1: 'https://larajean.com/image.png'
  };
  const setImages = imageUpdate => (image = imageUpdate);
  const { getByText } = render(
    <MultiImageInput
      images={images}
      setImages={setImages}
      cropConfig={{ crop, ruleOfThirds: true }}
    />
  );
  const uploadImage = getByText('ADD IMAGE');
  expect(uploadImage).not.toBeNull();
});

test('deletes an image', () => {
  let images = {
    0: 'https://dababy.com/image.png',
    1: 'https://larajean.com/image.png',
    2: 'hhh'
  };
  const setImages = jest.fn(imageUpdate => (images = imageUpdate));
  const { getAllByRole } = render(
    <MultiImageInput
      images={images}
      setImages={setImages}
      cropConfig={{ crop, ruleOfThirds: true }}
    />
  );
  const deleteButton = getAllByRole('button', { label: 'Delete Image 0' });
  fireEvent.click(deleteButton[1]);
  expect(setImages).toBeCalled();
  expect(Object.keys(images).length).toBe(2);
});
