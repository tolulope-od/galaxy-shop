import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { HeartFill, PeopleFill, Box2Fill, Collection, Rulers, Trash } from 'react-bootstrap-icons';
import formatNumber from '../../utils/formatNumber';
import useFilms from '../../hooks/useFilms';
import TextDecriptionField from '../fragments/TextDescriptionField.jsx';
import IconDescriptionField from '../fragments/IconDescriptionField.jsx';
import { addOrRemoveFavorite, checkIfExistsInFavorites } from '../../utils/addOrRemoveFavorite';
import { API } from '../../config/api';

const ProductItem = () => {
  const location = useLocation();
  const [productLoading, setProductLoading] = React.useState(true);
  const { filmNameMap, fetchFilms } = useFilms();
  const item = location.state?.item;
  const [product, setProduct] = React.useState({});
  const [isFaved, setIsFaved] = React.useState(false);

  const handleRemoveOrAdd = () => {
    addOrRemoveFavorite(product, (value) => {
      setIsFaved(value);
    });
  };

  const isStarship = /starship/gi.test(location.pathname);
  const fetDataFromAPI = async () => {
    setProductLoading(true);
    try {
      const request = await API.get(location.pathname);
      const type = isStarship ? 'Starship' : 'Vehicle';
      const data = {
        ...request.data,
        type,
      };
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoading(false);
    }
  };

  React.useEffect(() => {
    if (item) {
      setProduct(item);
    } else {
      fetDataFromAPI();
    }

    fetchFilms();
  }, []);

  React.useEffect(() => {
    const exists = checkIfExistsInFavorites(product);
    setIsFaved(exists);
  }, [product]);

  const imgSrc =
    isStarship
      ? 'https://res.cloudinary.com/tolulope-od/image/upload/v1652143375/josue-as-_nprTIIwSk4-unsplash_zohnoh.jpg'
      : 'https://res.cloudinary.com/tolulope-od/image/upload/v1652144632/jerome-boursier-q7UAevltCMg-unsplash_lhhpvl.jpg';

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={imgSrc}
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">{product?.model}</div>
            <h1 className="display-5 fw-bolder">{product?.name}</h1>
            <div className="fs-5 mb-5">
              <span>
                $
                {!isNaN(product?.cost_in_credits)
                  ? formatNumber(Number(product?.cost_in_credits) / 100.0)
                  : product?.cost_in_credits}
              </span>
            </div>
            <div className="films--badges">
              <IconDescriptionField icon={<PeopleFill />} text={product?.crew} />
              <IconDescriptionField
                icon={<Box2Fill />}
                text={
                  !isNaN(Number(product?.cargo_capacity))
                    ? `${formatNumber(Number(product?.cargo_capacity))}kg`
                    : 'unknown'
                }
              />
              <IconDescriptionField icon={<Rulers />} text={`${product?.length}m`} />
              <IconDescriptionField icon={<Collection />} text={product?.type} />
            </div>
            <TextDecriptionField heading={'Manufacturer'} text={product?.manufacturer} />
            <TextDecriptionField heading={'Starship Class'} text={product?.starship_class} />
            <TextDecriptionField heading={'Consumables'} text={product?.consumables} />
            <TextDecriptionField heading={'MGLT'} text={product?.MGLT} />
            <TextDecriptionField heading={'Passengers'} text={product?.passengers} />
            <TextDecriptionField
              heading={'Max Atmosphering Speed'}
              text={`${product?.max_atmosphering_speed}`}
            />

            <p className="text-muted m-0">
              <small>Appears in:</small>
            </p>
            <div className="films--badges">
              {product?.films?.length > 0 &&
                product?.films?.map((filmURL) => (
                  <Badge bg="dark" key={filmURL} className="p-1.5 film__badge-item">
                    {filmNameMap[filmURL]}
                  </Badge>
                ))}
            </div>
            <div className="d-flex">
              <button
                onClick={handleRemoveOrAdd}
                className="btn btn-outline-dark flex-shrink-0"
                type="button"
              >
                <span className="me-1">{isFaved ? <Trash /> : <HeartFill />}</span>
                {isFaved ? 'Remove from favorites' : 'Add to favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
