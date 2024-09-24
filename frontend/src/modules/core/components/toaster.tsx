import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';

const Toaster: FC = () => {
	return <ToastContainer position='top-right' stacked theme={'light'} />;
};

export default Toaster;
