import { ReactNode } from 'react';

export default function PublicActions(): ReactNode {
	return (
		<div className="public-actions">
			<button className="btn dark small">Entrar</button>
			<button className="btn secondary small">Criar conta</button>
		</div>
	);
}
