<?php

/**
 * This is the model class for table "slider_translates".
 *
 * The followings are the available columns in table 'slider_translates':
 * @property integer $id
 * @property integer $slider_id
 * @property string $lang
 * @property string $name
 * @property string $text
 *
 * The followings are the available model relations:
 * @property Slider $slider
 */
class SliderTranslates extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'slider_translates';
	}

	// /**
	//  * @return array validation rules for model attributes.
	//  */
	// public function rules()
	// {
	// 	// NOTE: you should only define rules for those attributes that
	// 	// will receive user inputs.
	// 	return array(
	// 		array('name, text', 'required'),
	// 		array('slider_id', 'numerical', 'integerOnly'=>true),
	// 		array('lang', 'length', 'max'=>6),
	// 		array('name', 'length', 'max'=>255),
	// 		// The following rule is used by search().
	// 		// @todo Please remove those attributes that should not be searched.
	// 		array('id, slider_id, lang, name, text', 'safe', 'on'=>'search'),
	// 	);
	// }

	// /**
	//  * @return array relational rules.
	//  */
	// public function relations()
	// {
	// 	// NOTE: you may need to adjust the relation name and the related
	// 	// class name for the relations automatically generated below.
	// 	return array(
	// 		'slider' => array(self::BELONGS_TO, 'Slider', 'slider_id'),
	// 	);
	// }

	// /**
	//  * @return array customized attribute labels (name=>label)
	//  */
	// public function attributeLabels()
	// {
	// 	return array(
	// 		'id' => 'ID',
	// 		'slider_id' => 'Slider',
	// 		'lang' => 'Lang',
	// 		'name' => 'Name',
	// 		'text' => 'Text',
	// 	);
	// }

	// /**
	//  * Retrieves a list of models based on the current search/filter conditions.
	//  *
	//  * Typical usecase:
	//  * - Initialize the model fields with values from filter form.
	//  * - Execute this method to get CActiveDataProvider instance which will filter
	//  * models according to data in model fields.
	//  * - Pass data provider to CGridView, CListView or any similar widget.
	//  *
	//  * @return CActiveDataProvider the data provider that can return the models
	//  * based on the search/filter conditions.
	//  */
	// public function search()
	// {
	// 	// @todo Please modify the following code to remove attributes that should not be searched.

	// 	$criteria=new CDbCriteria;

	// 	$criteria->compare('id',$this->id);
	// 	$criteria->compare('slider_id',$this->slider_id);
	// 	$criteria->compare('lang',$this->lang,true);
	// 	$criteria->compare('name',$this->name,true);
	// 	$criteria->compare('text',$this->text,true);

	// 	return new CActiveDataProvider($this, array(
	// 		'criteria'=>$criteria,
	// 	));
	// }

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return SliderTranslates the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
