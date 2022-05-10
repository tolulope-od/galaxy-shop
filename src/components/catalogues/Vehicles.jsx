import * as React from 'react';
import LoadingCard from '../loaders/LoadingCard.jsx';
import StoreItem from '../cards/StoreItem.jsx';
import { API } from '../../config/api';

const Vehicles = () => {
  const [vehiclesLoading, setVehiclesLoading] = React.useState(true);
  const [vehicles, setVehicles] = React.useState([]);

  const fetchVehicles = async () => {
    setVehiclesLoading(true);
    try {
      const request = await API.get('vehicles/?format=json');

      console.log(request.data);
      setVehicles(request.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setVehiclesLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="py-4">
        <h2>Vehicles</h2>
      </div>
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
        {vehiclesLoading && [0, 1, 2, 3, 4, 5, 6, 7].map((card) => <LoadingCard key={card} />)}

        {!vehiclesLoading &&
          vehicles.length > 0 &&
          vehicles.map((vehicle) => (
            <StoreItem key={vehicle.url} {...{ type: 'Vehicles', ...vehicle }} />
          ))}
      </div>
    </div>
  );
};

export default Vehicles;
