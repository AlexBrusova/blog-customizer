import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions } from 'src/constants/articleProps';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';

type Props = {
	onChange: ({}: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [params, setParams] = useState(defaultArticleState);

	const handleClick = () => {
		setOpen(!isOpen);
	};

	function handleOptionChange(key: string, option: OptionType) {
		setParams({ ...params, [key]: option });
	}

	function handleResetOptions() {
		setParams(defaultArticleState);
		onChange(defaultArticleState);
	}

	function handleSubmitOptions(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onChange(params);
		handleClick();
	}

	let className = styles.container;

	if (isOpen) {
		className = className + ' ' + styles.container_open;
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside ref={formRef} className={className}>
				<form className={styles.form}
				onSubmit={handleSubmitOptions}
				onReset={handleResetOptions} >
					<Text as='p' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={params.fontFamilyOption}
						onChange={(selected) => {
							handleOptionChange('fontFamilyOption', selected);
						}}>
					</Select>
					<RadioGroup
						title='Размер Шрифта'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={(selected) => {
							handleOptionChange('fontSizeOption', selected);
						}}
						name='fontSize'
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={params.fontColor}
						onChange={(selected) => {
							handleOptionChange('fontColor', selected);
						}}>
					</Select>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={params.backgroundColor}
						onChange={(selected) => {
							handleOptionChange('backgroundColor', selected);
						}}>
					</Select>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={params.contentWidth}
						onChange={(selected) => {
							handleOptionChange('contentWidth', selected);
						}}>
					</Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
