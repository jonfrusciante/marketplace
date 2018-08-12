import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, InputGroup, HTMLSelect, Button, Icon } from '@blueprintjs/core';

export default class Form extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			disabled,
			errors,
			onChange,
			onSubmit,
			touched,
			isValid,
			loading,
			onBlur,
			categories,
			values: { name, parentId },
		} = this.props;
		return (
			<div className="container">
				<FormGroup
					label="Category Name"
					labelFor="name"
					helperText={touched.name && errors.name ? errors.name : undefined}
					intent={touched.name && errors.name ? 'danger' : undefined}>
					<InputGroup
						id="name"
						name="name"
						required={true}
						autoFocus={true}
						type="text"
						autoComplete="off"
						minLength={3}
						value={name}
						onChange={onChange}
						disabled={disabled}
						onBlur={onBlur}
					/>
				</FormGroup>
				<FormGroup
					label="Parent Category"
					labelFor="parentId"
					helperText={
						touched.parentId && errors.parentId
							? errors.parentId
							: undefined
					}
					intent={
						touched.parentId && errors.parentId
							? 'danger'
							: undefined
					}>
					<HTMLSelect
						id="parentId"
						name="parentId"
						fill={true}
						disabled={disabled}
						onBlur={onBlur}
						value={parentId}
						onChange={onChange}>
						<option>-- select --</option>
						{categories.map((category: any) => (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						))}
					</HTMLSelect>
				</FormGroup>
				<FormGroup>
					<div className="row">
						<div className="col-md-6">
							<div className="page-back-button">
								<Link to="/categories" className="bp3-button bp3-fill bp3-intent-warning">
									<Icon icon="arrow-left" />
								</Link>
							</div>
						</div>
						<div className="col-md-6">
							<Button
								intent="primary"
								icon="arrow-right"
								type="submit"
								fill={true}
								disabled={!isValid || loading}
								loading={loading}
								onClick={onSubmit}
							/>
						</div>
					</div>
				</FormGroup>
			</div>
		);
	}
}