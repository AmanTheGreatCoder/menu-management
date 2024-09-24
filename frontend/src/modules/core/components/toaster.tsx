import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';

interface ToasterProps {}

const Toaster: FC<ToasterProps> = () => {
	return <ToastContainer position='top-right' stacked theme={'light'} />;
};

export default Toaster;
