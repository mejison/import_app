<?php
	class App {
	
		public function get_nav($post)
		{
			return array('id', 'name', 'price', 'oldprice');
		}
		
		public function upload_file($post)
		{
			$path = './imports/';
			if ( ! file_exists($path))
			{
				mkdir($path, 0755);
			}
			
			$ext = pathinfo($_FILES['files']['name'], PATHINFO_EXTENSION);
			$file_name = 'upload_' . time() . $ext;
			if(rename($_FILES['files']['tmp_name'], $new_path = $path . $file_name))
			{
				$data = array();
				if (method_exists($this, 'parse_' . $ext))
				{
					$method = 'parse_' . $ext;
					$data = $this->$method($new_path);
				}
				else
				{
					return array('upload_success' => FALSE);
				}
				return array('upload_success' => TRUE, data => $data);
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
		
	}
	
	if (method_exists($class = new App, $method = $_GET['action']))
	{
		echo json_encode($class->$method($_POST));
	}
	