<?php
	class App {
	
		public function get_nav($post)
		{
			$field = array();
			$db = new mysqli('localhost', 'root', '', 'test');
			$db->set_charset('SET NAME utf8');
			$result = $db->query('select * from `car_items`');
			foreach($result->fetch_fields() as $row)
			{
				$field[] = $row->name;
			}
			$db->close();
			return $field;
		}
		
		public function upload_file($post)
		{
			$path = './imports/';
			if ( ! file_exists($path))
			{
				mkdir($path, 0755);
			}
			
			$ext = pathinfo($_FILES['files']['name'], PATHINFO_EXTENSION);
			$file_name = 'upload_' . time() . '.' . $ext;
			if(rename($_FILES['files']['tmp_name'], $new_path = $path . $file_name))
			{
				$method = '';
				$data = array();
				if (method_exists($this, $method = 'parse_' . $ext))
				{
					$data = $this->$method($new_path);
				}
				else
				{
					return array('upload_success' => FALSE);
				}
				return array('upload_success' => TRUE, 'data' => $data, 'file' => $file_name, 'method' => $method);
			}
			return array('upload_success' => FALSE);
		}
		
		private function parse_csv($file)
		{
			$data = array();
			foreach(file($file) as $line)
			{
				$data[] = explode(',', $line);
			}
			array_shift($data);
			return $data;
		}
		
		private function parse_xls($file)
		{
			
		}
		
		public function save_items($post)
		{
			$field = array();
			foreach($post as $key => $value)
			{
				if (is_int($key))
				{
					$field[$key] = $value;
				}
			}
			
			$data = $this->$post['method']("./imports/" . $post['file_name']);
			$connect = new mysqli('localhost', 'root', '', 'test');
			
			foreach ($data as $row)
			{
				$sql = "INSERT INTO `car_items` (`";
				$sql .= implode("`,`", $field);
				$sql .= "`) VALUES ('";
				$sql .= implode("','", $row) . "')";
				$connect->query($sql);
			}
			
			return TRUE;
		}
		
	}
	
	if (method_exists($class = new App, $method = $_GET['action']))
	{
		echo json_encode($class->$method($_POST));
	}
	