        // ============================================
        // API CONFIGURATION
        // ============================================
        //Apply Your jyotishamastro Api Key visit https://jyotishamastroapi.com/ 
        // Hardcoded API Key - sent in request header
        const API_KEY = "YOUR_API_KEY";
        // const API_KEY = "2a10htxxxxxxxxxxxxxxxxx";
        
        // ============================================
        // PDF REPORT CONFIGURATION
        // ============================================
        // JavaScript array containing report name + API URL mapping
        const REPORTS = [
            {
                "label": "Horoscope (Small)",
                "url": "https://api.jyotishamastroapi.com/api/pdf/generate",
                "type": "horoscope",
                "size": "small"
            },
            {
                "label": "Horoscope (Medium)",
                "url": "https://api.jyotishamastroapi.com/api/pdf/generate",
                "type": "horoscope",
                "size": "medium"
            },
            {
                "label": "Horoscope (Large)",
                "url": "https://api.jyotishamastroapi.com/api/pdf/generate",
                "type": "horoscope",
                "size": "large"
            },
            {
                "label": "Kundali Matching",
                "url": "https://api.jyotishamastroapi.com/api/pdf/generate_matching",
                "type": "matching"
            },
            {
                "label": "Foreign Travel Report",
                "url": "https://api.jyotishamastroapi.com/api/pdf/foreign_travel_report"
            },
            {
                "label": "Government Job Report",
                "url": "https://api.jyotishamastroapi.com/api/pdf/government_job_report"
            },
            {
                "label": "Financial Opportunities & Challenges",
                "url": "https://api.jyotishamastroapi.com/api/pdf/financial_opportunities_and_challenges_report"
            },
            {
                "label": "Education & Learning Pathways",
                "url": "https://api.jyotishamastroapi.com/api/pdf/education_and_learning_pathways_report"
            },
            {
                "label": "Kundali Samyak",
                "url": "https://api.jyotishamastroapi.com/api/pdf/kundali_samyak"
            },
            {
                "label": "Kundali Dirgha Drishti",
                "url": "https://api.jyotishamastroapi.com/api/pdf/kundali_dirghaDrishti"
            },
            {
                "label": "Kundali Mool Patrika",
                "url": "https://api.jyotishamastroapi.com/api/pdf/Kundali_moolPatrika"
            },
            {
                "label": "Vedic 5 Year Prediction",
                "url": "https://api.jyotishamastroapi.com/api/pdf/vedic_five_year_predictions"
            },
            {
                "label": "Vedic 10 Year Prediction",
                "url": "https://api.jyotishamastroapi.com/api/pdf/vedic_ten_year_predictions"
            },
            {
                "label": "Vedic 15 Year Prediction",
                "url": "https://api.jyotishamastroapi.com/api/pdf/vedic_fifteen_year_predictions"
            },
            {
                "label": "Queen of Hearts",
                "url": "https://api.jyotishamastroapi.com/api/pdf/queen-of-hearts"
            }
        ];
        
        // Store selected report data
        let selectedReport = null;
        
        // ============================================
        // GOOGLE PLACES AUTocomplete INITIALIZATION
        // ============================================
        // Initialize Google Places Autocomplete for Place of Birth fields
        function initGooglePlaces() {
            // Initialize for normal form place field
            const googleApiKey = "Your_Google_API_Key";
            // const googleApiKey = "AIzaSyBK07Txxxxxxxxxxxxxxxxxx";
            function getTimezone(lat, lng, callback) {
                const timestamp = Math.floor(Date.now() / 1000);
                const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${googleApiKey}`;
    
                fetch(timezoneUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'OK') {
                            // rawOffset is in seconds, convert to hours
                            const timezoneOffset = data.rawOffset / 3600;
                            callback(timezoneOffset);
                        } else {
                            console.error('Timezone API Error:', data.status);
                            callback(5.5); // Default to IST if error
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching timezone:', error);
                        callback(5.5); // Default to IST if error
                    });
            }
            const placeInput = document.getElementById('place');
            if (placeInput) {
                const autocomplete = new google.maps.places.Autocomplete(placeInput, {
                    types: ['(cities)'],
                    fields: ['geometry', 'formatted_address', 'name']
                });
                
                autocomplete.addListener('place_changed', function() {
                    const place = autocomplete.getPlace();
                    if (place.geometry) {
                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();
                        $('#lat').val(lat);
                        $('#lon').val(lng);
                        $('#place').val(place.formatted_address || place.name);
                         getTimezone(lat, lng, function(timezone) {
                             $('#tz').val(timezone);
                           console.log('Timezone for place:', timezone);
                        });
                    }
                });
            }
            
            // Initialize for boy place field
            const boyPlaceInput = document.getElementById('boy_place');
            if (boyPlaceInput) {
                const boyAutocomplete = new google.maps.places.Autocomplete(boyPlaceInput, {
                    types: ['(cities)'],
                    fields: ['geometry', 'formatted_address', 'name']
                });
                
                boyAutocomplete.addListener('place_changed', function() {
                    const place = boyAutocomplete.getPlace();
                    if (place.geometry) {
                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();
                        $('#boy_lat').val(lat);
                        $('#boy_lon').val(lng);
                        $('#boy_place').val(place.formatted_address || place.name);
                         getTimezone(lat, lng, function(timezone) {
                            $('#boy_tz').val(timezone);
                            console.log('Timezone for place:', timezone);
                        });
                    }
                });
            }
            
            // Initialize for girl place field
            const girlPlaceInput = document.getElementById('girl_place');
            if (girlPlaceInput) {
                const girlAutocomplete = new google.maps.places.Autocomplete(girlPlaceInput, {
                    types: ['(cities)'],
                    fields: ['geometry', 'formatted_address', 'name']
                });
                
                girlAutocomplete.addListener('place_changed', function() {
                    const place = girlAutocomplete.getPlace();
                    if (place.geometry) {
                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();
                        $('#girl_lat').val(lat);
                        $('#girl_lon').val(lng);
                        $('#girl_place').val(place.formatted_address || place.name);
                         getTimezone(lat, lng, function(timezone) {
                            $('#girl_tz').val(timezone);
                            console.log('Timezone for place:', timezone);
                        });
                    }
                });
            }
        }
        
        // ============================================
        // INITIALIZE DATEPICKER AND TIMEPICKER
        // ============================================
        function initDateTimePickers() {
            // Initialize datepicker for normal form
            $('#dob').datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                yearRange: '1900:2100',
                maxDate: new Date()
            });
            
            // Initialize timepicker for normal form
            $('#tob').timepicker({
                timeFormat: 'HH:mm',
                interval: 1,
                defaultTime: '12:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
            });
            
            // Initialize datepicker for boy form
            $('#boy_dob').datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                yearRange: '1900:2100',
                maxDate: new Date()
            });
            
            // Initialize timepicker for boy form
            $('#boy_tob').timepicker({
                timeFormat: 'HH:mm',
                interval: 1,
                defaultTime: '12:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
            });
            
            // Initialize datepicker for girl form
            $('#girl_dob').datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                yearRange: '1900:2100',
                maxDate: new Date()
            });
            
            // Initialize timepicker for girl form
            $('#girl_tob').timepicker({
                timeFormat: 'HH:mm',
                interval: 1,
                defaultTime: '12:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
            });
        }
        
        // ============================================
        // POPULATE REPORT DROPDOWN ON PAGE LOAD
        // ============================================
        $(document).ready(function() {
            // Populate report dropdown from JavaScript array
            const $reportSelect = $('#reportType');
            REPORTS.forEach(function(report, index) {
                $reportSelect.append(
                    $('<option></option>')
                        .attr('value', index)
                        .text(report.label)
                );
            });
            
            // Initialize datepicker and timepicker
            initDateTimePickers();
            
            // Initialize Google Places after page load
            if (typeof google !== 'undefined' && google.maps && google.maps.places) {
                initGooglePlaces();
            } else {
                setTimeout(initGooglePlaces, 500);
            }
            
            // Handle report selection change
            $('#reportType').on('change', function() {
                const selectedIndex = $(this).val();
                if (selectedIndex !== '') {
                    selectedReport = REPORTS[selectedIndex];
                    
                    // Show/hide forms based on report type
                    if (selectedReport.type === 'matching') {
                        $('#normalForm').hide();
                        $('#matchingForm').show();
                        // Re-initialize Google Places and date/time pickers for matching form
                        setTimeout(function() {
                            initGooglePlaces();
                            initDateTimePickers();
                        }, 100);
                    } else {
                        $('#normalForm').show();
                        $('#matchingForm').hide();
                    }
                } else {
                    selectedReport = null;
                    $('#normalForm').show();
                    $('#matchingForm').hide();
                }
            });
        });
        
        // ============================================
        // FORM SUBMISSION HANDLER
        // ============================================
        // Handle form submission and send GET request to API
        $(document).ready(function() {
            $('#astrologyForm').on('submit', function(e) {
                e.preventDefault();
                
                // Hide previous messages
                $('#message').hide().removeClass('error');
                
                // Validate required fields
                if (!validateForm()) {
                    return;
                }
                
                // Disable submit button and show loader
                $('#submitBtn').prop('disabled', true);
                $('#loader').show();
                
                // Build API URL dynamically with query parameters
                const apiUrl = buildApiUrl();
                
                // Call API using jQuery AJAX with GET method
                $.ajax({
                    url: apiUrl,
                    method: 'GET',
                    headers: {
                        'key': API_KEY
                    },
                    success: function(response) {
                        // Hide loader
                        $('#loader').hide();
                        
                        // Handle success response - open PDF in new tab
                        handleSuccess(response);
                    },
                    error: function(xhr, status, error) {
                        // Hide loader
                        $('#loader').hide();
                        
                        // Handle error response
                        handleError(xhr, status, error);
                    },
                    complete: function() {
                        // Re-enable submit button
                        $('#submitBtn').prop('disabled', false);
                    }
                });
            });
        });
        
        // ============================================
        // BUILD API URL WITH QUERY PARAMETERS
        // ============================================
        function buildApiUrl() {
            if (!selectedReport) {
                return '';
            }
            
            const baseUrl = selectedReport.url;
            const params = [];
            
            // Check if it's matching type
            if (selectedReport.type === 'matching') {
                // Add matching parameters
                alert('matching');
                params.push('boy_name=' + encodeURIComponent($('#boy_name').val().trim()));
                params.push('boy_dob=' + encodeURIComponent($('#boy_dob').val().trim()));
                params.push('boy_tob=' + encodeURIComponent($('#boy_tob').val().trim()));
                params.push('boy_lat=' + encodeURIComponent($('#boy_lat').val()));
                params.push('boy_lon=' + encodeURIComponent($('#boy_lon').val()));
                params.push('boy_place=' + encodeURIComponent($('#boy_place').val().trim()));
                params.push('girl_name=' + encodeURIComponent($('#girl_name').val().trim()));
                params.push('girl_dob=' + encodeURIComponent($('#girl_dob').val().trim()));
                params.push('girl_tob=' + encodeURIComponent($('#girl_tob').val().trim()));
                params.push('girl_lat=' + encodeURIComponent($('#girl_lat').val()));
                params.push('girl_lon=' + encodeURIComponent($('#girl_lon').val()));
                params.push('girl_place=' + encodeURIComponent($('#girl_place').val().trim()));
                params.push('lang=' + encodeURIComponent($('#matching_lang').val()));
                 params.push('boy_tz=' + encodeURIComponent($('#boy_tz').val()));
                params.push('girl_tz=' + encodeURIComponent($('#girl_tz').val()));
            } else {
                $('#name').attr('required', true);
                $('#dob').attr('required', true);
                $('#tob').attr('required', true);
                $('#lat').attr('required', true);
                $('#lon').attr('required', true);
                $('#place').attr('required', true);
                $('#lang').attr('required', true);

                // Add normal parameters
                params.push('name=' + encodeURIComponent($('#name').val().trim()));
                params.push('date=' + encodeURIComponent($('#dob').val().trim()));
                params.push('time=' + encodeURIComponent($('#tob').val().trim()));
                params.push('lat=' + encodeURIComponent($('#lat').val()));
                params.push('lon=' + encodeURIComponent($('#lon').val()));
                params.push('place=' + encodeURIComponent($('#place').val().trim()));
                params.push('lang=' + encodeURIComponent($('#lang').val()));
                params.push('tz=' + encodeURIComponent($('#tz').val()));
                
                // Add pdf_type parameter for horoscope reports
                if (selectedReport.type === 'horoscope' && selectedReport.size) {
                    params.push('pdf_type=' + encodeURIComponent(selectedReport.size));
                }
            }
            
            // Add common parameters
            // params.push('tz=5.5');
            params.push('style=north');
            
            // Add optional company parameters
            const companyName = $('#company_name').val().trim();
            const companyAddress = $('#company_address').val().trim();
            const companyEmail = $('#company_email').val().trim();
            const companyPhone = $('#company_phone').val().trim();
            const companyWebsite = $('#company_website').val().trim();
            
            if (companyName) {
                params.push('company_name=' + encodeURIComponent(companyName));
            }
            if (companyAddress) {
                params.push('company_address=' + encodeURIComponent(companyAddress));
            }
            if (companyEmail) {
                params.push('company_email=' + encodeURIComponent(companyEmail));
            }
            if (companyPhone) {
                params.push('company_phone=' + encodeURIComponent(companyPhone));
            }
            if (companyWebsite) {
                params.push('company_website=' + encodeURIComponent(companyWebsite));
            }
            
            // Build final URL
            return baseUrl + '?' + params.join('&');
        }
        
        // ============================================
        // FORM VALIDATION
        // ============================================
        function validateForm() {
            if (!selectedReport) {
                showError('Please select a report type.');
                return false;
            }
            
            // Validate based on report type
            if (selectedReport.type === 'matching') {
                // Validate matching form fields
                if (!$('#boy_name').val().trim()) {
                    showError('Please enter boy name.');
                    return false;
                }
                if (!$('#boy_dob').val().trim()) {
                    showError('Please enter boy date of birth.');
                    return false;
                }
                if (!$('#boy_tob').val().trim()) {
                    showError('Please enter boy time of birth.');
                    return false;
                }
                if (!$('#boy_place').val().trim()) {
                    showError('Please enter boy place of birth.');
                    return false;
                }
                if (!$('#boy_lat').val() || $('#boy_lat').val() === '') {
                    showError('Please select a valid place for boy from the suggestions.');
                    return false;
                }
                if (!$('#boy_lon').val() || $('#boy_lon').val() === '') {
                    showError('Please select a valid place for boy from the suggestions.');
                    return false;
                }
                if (!$('#girl_name').val().trim()) {
                    showError('Please enter girl name.');
                    return false;
                }
                if (!$('#girl_dob').val().trim()) {
                    showError('Please enter girl date of birth.');
                    return false;
                }
                if (!$('#girl_tob').val().trim()) {
                    showError('Please enter girl time of birth.');
                    return false;
                }
                if (!$('#girl_place').val().trim()) {
                    showError('Please enter girl place of birth.');
                    return false;
                }
                if (!$('#girl_lat').val() || $('#girl_lat').val() === '') {
                    showError('Please select a valid place for girl from the suggestions.');
                    return false;
                }
                if (!$('#girl_lon').val() || $('#girl_lon').val() === '') {
                    showError('Please select a valid place for girl from the suggestions.');
                    return false;
                }
                if (!$('#matching_lang').val()) {
                    showError('Please select language.');
                    return false;
                }
            } else {
                // Validate normal form fields
                if (!$('#name').val().trim()) {
                    showError('Please enter name.');
                    return false;
                }
                if (!$('#dob').val().trim()) {
                    showError('Please enter date of birth.');
                    return false;
                }
                if (!$('#tob').val().trim()) {
                    showError('Please enter time of birth.');
                    return false;
                }
                if (!$('#place').val().trim()) {
                    showError('Please enter place of birth.');
                    return false;
                }
                if (!$('#lat').val() || $('#lat').val() === '') {
                    showError('Please select a valid place from the suggestions.');
                    return false;
                }
                if (!$('#lon').val() || $('#lon').val() === '') {
                    showError('Please select a valid place from the suggestions.');
                    return false;
                }
                if (!$('#lang').val()) {
                    showError('Please select language.');
                    return false;
                }
            }
            
            return true;
        }
        
        // ============================================
        // SUCCESS RESPONSE HANDLER
        // ============================================
        // Handle successful PDF generation - display PDF URL and download button
        function handleSuccess(response) {
            let pdfUrl = null;
            
            // Check if response contains PDF URL
            if (response.downloadUrl) {
                pdfUrl = response.downloadUrl;
            } else if (response.pdf_url) {
                pdfUrl = response.pdf_url;
            } else if (response.url) {
                pdfUrl = response.url;
            } else if (response.data && response.data.downloadUrl) {
                pdfUrl = response.data.downloadUrl;
            } else if (response.data && response.data.pdf_url) {
                pdfUrl = response.data.pdf_url;
            } else if (response.data && response.data.url) {
                pdfUrl = response.data.url;
            } else if (typeof response === 'string' && response.startsWith('http')) {
                pdfUrl = response;
            }
            
            if (pdfUrl) {
                // Display success message with PDF URL and download button
                let messageHtml = '<strong>PDF Generated Successfully!</strong>';
                messageHtml += '<div class="pdf-url">PDF URL: <a href="' + pdfUrl + '" target="_blank">' + pdfUrl + '</a></div>';
                messageHtml += '<button onclick="window.open(\'' + pdfUrl + '\', \'_blank\')" class="download-btn">Download PDF</button>';
                
                $('#message').html(messageHtml).removeClass('error').addClass('success').show();
                
                // Also open PDF in new browser tab automatically
                window.open(pdfUrl, '_blank');
            } else {
                // If no PDF URL found, show response for debugging
                showError('PDF URL not found in response: ' + JSON.stringify(response));
            }
        }
        
        // ============================================
        // ERROR RESPONSE HANDLER
        // ============================================
        // Handle error responses from API
        function handleError(xhr, status, error) {
            let errorMessage = 'An error occurred while generating the PDF.';
            
            // Try to extract error message from response
            if (xhr.responseJSON) {
                if (xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message;
                } else if (xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                } else {
                    errorMessage = JSON.stringify(xhr.responseJSON);
                }
            } else if (xhr.responseText) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.message) {
                        errorMessage = response.message;
                    } else if (response.error) {
                        errorMessage = response.error;
                    }
                } catch (e) {
                    errorMessage = xhr.responseText || errorMessage;
                }
            } else if (xhr.status === 0) {
                errorMessage = 'Network error. Please check your internet connection.';
            } else if (xhr.status === 401) {
                errorMessage = 'Invalid API key. Please check your API configuration.';
            } else if (xhr.status === 400) {
                errorMessage = 'Invalid request. Please check all required fields.';
            } else if (xhr.status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            }
            
            showError(errorMessage);
        }
        
        // ============================================
        // UTILITY FUNCTIONS
        // ============================================
        function showError(message) {
            $('#message').html('<strong>Error:</strong> ' + message).addClass('error').show();
        }
    