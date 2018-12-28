import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const LoginForm = (props) => {
	const {
		values: { email, password },
		errors,
		touched,
		handleChange,
		isValid,
		setFieldTouched,
		submitHandler,
		translate
	} = props;

	const change = (name, e) => {
		e.persist();
		handleChange(e);
		setFieldTouched(name, true, false);
	};

	return (
		<form>
			<TextField
				id="email"
				name="email"
				label="Email"
				value={props.values.email}
				helperText={touched.email ? errors.email : ''}
				error={touched.email && Boolean(errors.email)}
				onChange={change.bind(null, 'email')}
				fullWidth
			/>
			<TextField
				id="password"
				name="password"
				label={ translate('ra.auth.password') }
				value={props.values.password}
				helperText={touched.password ? errors.password : ''}
				error={touched.password && Boolean(errors.password)}
				onChange={change.bind(null, 'password')}
				fullWidth
				type="password"
			/>
			<Button
				fullWidth
				variant="outlined"
				color="primary"
				style={{ marginTop: 10 }}
				onClick={() => submitHandler({email: email, password: password})}
				disabled={!isValid}
			>
				{translate('ra.auth.sign_in')}
			</Button>
		</form>
	);
};
